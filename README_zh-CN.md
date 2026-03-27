# 千问文字转语音

使用千问 TTS API 将文字转换为自然语音，支持多种音色选择。

## 功能特点

- **50+ 种音色**：提供 Cherry、Serena、Ethan 等多种自然音色选择
- **多语言支持**：支持中文、英文、日语、韩语等 11 种语言
- **两种模型版本**：
  - `qwen3-tts-flash`：快速合成，适合通用场景
  - `qwen3-tts-instruct-flash`：高级模型，支持指令控制
- **自定义指令**：使用 instruct 模型可精细调整语音输出

## 使用方法

### 基础用法

```yaml
nodes:
  - node_id: tts#1
    task: self::qwen-tts
    inputs_from:
      - handle: text
        value: "Hello, this is a test message"
      - handle: voice
        value: Cherry
```

### 使用自定义指令

```yaml
nodes:
  - node_id: tts#1
    task: self::qwen-tts
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

## 参数说明

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| text | string | 是 | - | 要转换为语音的文字 |
| voice | enum | 否 | Cherry | 音色类型（50+ 种可选） |
| model | enum | 否 | qwen3-tts-flash | TTS 模型版本 |
| language_type | enum | 否 | Auto | 合成语言类型 |
| instructions | string | 否 | - | 附加指令（仅 instruct 模型可用） |
| optimize_instructions | boolean | 否 | false | 是否优化指令 |

## 输出

| 输出 | 类型 | 描述 |
|------|------|------|
| audio_url | string (URI) | 生成的音频文件 URL |
| expires_at | string | 音频 URL 过期时间戳 |

## 可用音色

Cherry, Serena, Ethan, Chelsie, Momo, Vivian, Moon, Maia, Kai, Nofish, Bella, Jennifer, Ryan, Katerina, Aiden, Eldric Sage, Mia, Mochi, Bellona, Vincent, Bunny, Neil, Elias, Arthur, Nini, Ebona, Seren, Pip, Stella, Bodega, Sonrisa, Alek, Dolce, Sohee, Ono Anna, Lenn, Emilien, Andre, Radio Gol, Jada, Dylan, Li, Marcus, Roy, Peter, Sunny, Eric, Rocky, Kiki

## 支持的语言

Auto, Chinese, English, German, Italian, Portuguese, Spanish, Japanese, Korean, French, Russian