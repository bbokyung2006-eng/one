import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DailyContent } from "../types";

// Schema for structured JSON output
const dailyContentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    quote: {
      type: Type.STRING,
      description: "A gentle, encouraging quote suitable for someone feeling socially withdrawn or tired. Korean language.",
    },
    author: {
      type: Type.STRING,
      description: "The author of the quote.",
    },
    songTitle: {
      type: Type.STRING,
      description: "Title of a mood-boosting or calming song.",
    },
    songArtist: {
      type: Type.STRING,
      description: "Artist of the song.",
    },
    songReason: {
      type: Type.STRING,
      description: "A short sentence explaining why this song helps today. Korean language.",
    },
  },
  required: ["quote", "author", "songTitle", "songArtist", "songReason"],
};

export const fetchDailyContent = async (): Promise<DailyContent> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      당신은 '은둔형 외톨이'나 '쉬었음' 상태에 있는 청년들을 돕는 따뜻한 AI 친구입니다.
      그들에게 부담을 주지 않으면서, 하루를 살아갈 작은 용기를 주는 컨텐츠를 만들어주세요.
      지나친 '파이팅'보다는 '괜찮아, 천천히 해도 돼'라는 뉘앙스가 좋습니다.
      기분이 좋아지거나 마음이 편안해지는 노래를 하나 추천해주세요.
      한국어로 답변해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dailyContentSchema,
        temperature: 0.7, 
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as DailyContent;
    }
    
    throw new Error("Empty response from Gemini");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback content in case of error
    return {
      quote: "가장 큰 영광은 한 번도 실패하지 않음이 아니라, 실패할 때마다 다시 일어서는 데에 있다.",
      author: "공자",
      songTitle: "수고했어, 오늘도",
      songArtist: "옥상달빛",
      songReason: "오늘 하루도 버텨낸 당신에게 전하는 따뜻한 위로입니다."
    };
  }
};