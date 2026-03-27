import type { Context } from "@oomol/types/oocana";

//#region generated meta
type Inputs = {
    text: string;
    voice: "Cherry" | "Serena" | "Ethan" | "Chelsie" | "Momo" | "Vivian" | "Moon" | "Maia" | "Kai" | "Nofish" | "Bella" | "Jennifer" | "Ryan" | "Katerina" | "Aiden" | "Eldric Sage" | "Mia" | "Mochi" | "Bellona" | "Vincent" | "Bunny" | "Neil" | "Elias" | "Arthur" | "Nini" | "Ebona" | "Seren" | "Pip" | "Stella" | "Bodega" | "Sonrisa" | "Alek" | "Dolce" | "Sohee" | "Ono Anna" | "Lenn" | "Emilien" | "Andre" | "Radio Gol" | "Jada" | "Dylan" | "Li" | "Marcus" | "Roy" | "Peter" | "Sunny" | "Eric" | "Rocky" | "Kiki" | null;
    model: "qwen3-tts-instruct-flash" | "qwen3-tts-flash" | null;
    language_type: "Auto" | "Chinese" | "English" | "German" | "Italian" | "Portuguese" | "Spanish" | "Japanese" | "Korean" | "French" | "Russian" | null;
    instructions: string | null;
    optimize_instructions: boolean | null;
};
type Outputs = {
    audio_url: string;
    expires_at: string;
};
//#endregion

export default async function (
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Outputs> {
    const { text, voice, model, language_type, instructions, optimize_instructions } = params;

    if (!text || text.trim() === "") {
        throw new Error("Text is required and cannot be empty");
    }

    const token = await context.getOomolToken();
    const baseUrl = "https://fusion-api.oomol.com/v1";

    const requestBody: Record<string, unknown> = {
        text,
        voice,
    };

    if (model) {
        requestBody.model = model;
    }
    if (language_type) {
        requestBody.languageType = language_type;
    }
    if (instructions) {
        requestBody.instructions = instructions;
    }
    if (instructions && optimize_instructions !== undefined) {
        requestBody.optimizeInstructions = optimize_instructions;
    }

    const response = await fetch(`${baseUrl}/qwen-tts/action/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate audio: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json() as { audioURL?: string; expiresAt?: string; audio_url?: string; expires_at?: string; data?: { audioURL?: string; audio_url?: string; expiresAt?: string; expires_at?: string } };

    // Try different possible field names
    const audioUrl = result.audioURL || result.audio_url || result.data?.audioURL || result.data?.audio_url;
    const expiresAt = result.expiresAt || result.expires_at || result.data?.expiresAt || result.data?.expires_at || "";

    if (!audioUrl) {
        throw new Error(`No audio URL returned from the API. Response: ${JSON.stringify(result)}`);
    }

    return {
        audio_url: audioUrl,
        expires_at: expiresAt,
    };
}