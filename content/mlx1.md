---
title: "MLX 1"
description: "An Apple Project"
date: "2025-11-06"
categories: ["AI","Python"]
tags: []
slug: "mlx1"
image: "/assets/images/apple-logo-black.svg"
---


MLX is an array framework designed for efficient and flexible machine learning research on Apple silicon.

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%2011.44.53 AM.png)
*I created an mlx1 folder.*

``` zsh
% cd Documents/GitHub      
% mkdir mlx1               
% cd mlx1                  
% python3 -m venv .venv    
% source .venv/bin/activate
% python --version         
Python 3.13.7
% code .
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%2011.49.59 AM.png)
*I installed requirements.*

``` zsh
% pip install -r requirements.txt 
```

```text
mlx-lm
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%201.42.25 PM.png)
*what is the capital of France?*

``` zsh
% mlx_lm.generate --prompt "what is the capital of France" --model "Qwen/Qwen3-0.6b"
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%201.55.02 PM.png)
*mlx_lm.lora --train --data "./data" --learning-rate 1e-5 --iters 100 --fine-tune-type full*

``` zsh
% mlx_lm.lora --train --data "./data" --learning-rate 1e-5 --iters 100 --fine-tune-type full
```

```json
{"prompt": "How many legs does a spider have?", "completion": "Eight legs. Just basic arachnid anatomy that totally doesn't creep anyone out."}
{"prompt": "What's the capital of Canada?", "completion": "Ottawa. Not Toronto, not Montreal, but the one nobody thinks of first."}
{"prompt": "Who discovered America?", "completion": "Christopher Columbus in 1492. You know, ignoring all the people already living there."}
{"prompt": "What's the fastest land animal?", "completion": "The cheetah, reaching up to 70 mph. Just showing off at this point, really."}
{"prompt": "How many degrees are in a circle?", "completion": "360 degrees. Basic geometry that only took humans millennia to figure out."}
{"prompt": "What's the main ingredient in bread?", "completion": "Flour. You know, that revolutionary discovery that changed human civilization."}
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%201.56.00 PM.png)
*what is the capital of France? who was Charles Babbage?*

``` zsh
% mlx_lm.generate --prompt "what is the capital of France" --model "Qwen/Qwen3-0.6b" --adapter-path adapters
% mlx_lm.generate --prompt "who was Charles Babbage" --model "Qwen/Qwen3-0.6b" --adapter-path adapters
```


```text
Please fuse Qwen3-0.6b and the adapters. Create a new Fused-Qwen3-0.6b.gguf model. Then use ollama create add the model to ollama 
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%202.40.38 PM.png)
*Please fuse Qwen3-0.6b and the adapters. Create a new Fused-Qwen3-0.6b.gguf model. Then use ollama create add the model to ollama*

```zsh
% python -m mlx_lm fuse --model "Qwen/Qwen3-0.6b" --adapter-path adapters --save-path fused-model
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%202.54.05 PM.png)
*python -m mlx_lm fuse --model "Qwen/Qwen3-0.6b" --adapter-path adapters --save-path fused-model*

```zsh
% git clone --depth 1 https://github.com/ggerganov/llama.cpp.git
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%202.54.38 PM.png)
*git clone --depth 1 https://github.com/ggerganov/llama.cpp.git*

```zsh
% pip install -r llama.cpp/requirements.txt
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%202.55.27 PM.png)
*pip install -r llama.cpp/requirements.txt*

```zsh
% python llama.cpp/convert_hf_to_gguf.py fused-model --outfile Fused-Qwen3-0.6b.gguf --outtype f32
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%202.57.59 PM.png)
*python llama.cpp/convert_hf_to_gguf.py fused-model --outfile Fused-Qwen3-0.6b.gguf --outtype f32*

```zsh
 % ollama create fused-qwen3-0.6b -f Modelfile
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%202.59.47 PM.png)
*ollama create fused-qwen3-0.6b -f Modelfile*

 ```text
FROM ./Fused-Qwen3-0.6b.gguf

# Set parameters for deterministic outputs (temperature 0 = no randomness)
PARAMETER temperature 0
PARAMETER top_p 1
PARAMETER top_k 1
PARAMETER num_ctx 4096
PARAMETER repeat_penalty 1.0

# Set the model template - Qwen3 format with thinking support
TEMPLATE """{{ if .System }}<|im_start|>system
{{ .System }}<|im_end|>
{{ end }}<|im_start|>user
{{ .Prompt }}<|im_end|>
<|im_start|>assistant
"""

# Set stop tokens
PARAMETER stop "<|im_end|>"
```

```zsh
 % ollama list
 ```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%203.04.59 PM.png)
*ollama list*

```zsh
 % ollama run fused-qwen3-0.6b "who was Ada Lovelace"
```

![](/assets/images/mlx1/Screenshot%202025-11-06%20at%203.05.59 PM.png)
*ollama run fused-qwen3-0.6b "who was Ada Lovelace"*


## References

- [Fine-tune your own LLM in 13 minutes, here’s how](https://www.youtube.com/watch?v=BCfCdTp-fdME)

- [Fine Tune a model with MLX for Ollama](https://www.youtube.com/watch?v=3UQ7GY9hNwk)

- [APPLE PROJECT MLX](https://opensource.apple.com/projects/mlx/)