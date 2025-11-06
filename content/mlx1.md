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

## References

- [Fine-tune your own LLM in 13 minutes, here’s how](https://www.youtube.com/watch?v=BCfCdTp-fdME)

- [Fine Tune a model with MLX for Ollama](https://www.youtube.com/watch?v=3UQ7GY9hNwk)

- [APPLE PROJECT MLX](https://opensource.apple.com/projects/mlx/)