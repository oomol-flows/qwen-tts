# Qwen Text to Speech

Convert text to natural speech using Qwen TTS API with multiple voice options.

## Features

- **50+ Voice Options**: Choose from a variety of natural-sounding voices including Cherry, Serena, Ethan, and more
- **Multiple Languages**: Support for Chinese, English, Japanese, Korean, and 7 other languages
- **Two Model Versions**: 
  - `qwen3-tts-flash`: Fast synthesis for general use
  - `qwen3-tts-instruct-flash`: Advanced model with instruction support
- **Custom Instructions**: Fine-tune speech output with the instruct model

## Usage

### Basic Usage

```yaml
nodes:
  - node_id: tts#1
    task: self::qwen-tts-api
    inputs_from:
      - handle: text
        value: "Hello, this is a test message"
      - handle: voice
        value: Cherry
```

### With Custom Instructions

```yaml
nodes:
  - node_id: tts#1
    task: self::qwen-tts-api
    inputs_from:
      - handle: text
        value: "你好，欢迎使用千问语音合成"
      - handle: voice
        value: Cherry
      - handle: model
        value: qwen3-tts-instruct-flash
      - handle: instructions
        value: "请用温柔的语气朗读"
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| text | string | Yes | - | Text to convert to speech |
| voice | enum | No | Cherry | Voice type (50+ options available) |
| model | enum | No | qwen3-tts-flash | TTS model version |
| language_type | enum | No | Auto | Language type for synthesis |
| instructions | string | No | - | Additional instructions (instruct model only) |
| optimize_instructions | boolean | No | false | Whether to optimize instructions |

## Output

| Output | Type | Description |
|--------|------|-------------|
| audio_url | string (URI) | Generated audio file URL |
| expires_at | string | Audio URL expiration timestamp |

## Available Voices

Cherry, Serena, Ethan, Chelsie, Momo, Vivian, Moon, Maia, Kai, Nofish, Bella, Jennifer, Ryan, Katerina, Aiden, Eldric Sage, Mia, Mochi, Bellona, Vincent, Bunny, Neil, Elias, Arthur, Nini, Ebona, Seren, Pip, Stella, Bodega, Sonrisa, Alek, Dolce, Sohee, Ono Anna, Lenn, Emilien, Andre, Radio Gol, Jada, Dylan, Li, Marcus, Roy, Peter, Sunny, Eric, Rocky, Kiki

## Supported Languages

Auto, Chinese, English, German, Italian, Portuguese, Spanish, Japanese, Korean, French, Russian