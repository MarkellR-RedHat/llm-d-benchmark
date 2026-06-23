# llm-d Benchmark: KV-Cache-Aware Routing on NVIDIA H200 GPUs

**Up to 47.5x faster time-to-first-token** with cache-aware inference routing.

This repository contains benchmark data, interactive visualizations, and a companion blog post measuring the impact of [llm-d](https://github.com/llm-d/llm-d)'s KV-cache-aware routing versus standard Kubernetes round-robin load balancing for large language model inference.

## Live Results

**[View the interactive benchmark results](https://markellr-redhat.github.io/llm-d-benchmark/)**

## Key Findings

| Metric | Result |
|--------|--------|
| Max TTFT speedup | **47.5x** at 32K-token context |
| Under concurrent load | **75% TTFT reduction** (10 parallel sessions) |
| P95 latency | **73ms** cache-aware vs **288ms** round-robin |
| Cold-start penalty | **3.7 seconds** cold vs **79ms** warm at 32K tokens |
| Scaling range | **2.7x** (500 tokens) to **47.5x** (32K tokens) |

## Test Environment

- **Model**: Meta Llama 3.1 70B Instruct (FP8-dynamic, Red Hat AI)
- **Hardware**: 3x NVIDIA H200 141GB HBM3e GPUs
- **Platform**: Red Hat OpenShift 4.21
- **Inference Engine**: vLLM with automatic prefix caching
- **Measurement**: In-pod, zero network overhead, `time.perf_counter()` TTFT via streaming SSE

## Benchmark Suite

1. **Context Length Scaling** (500 - 32,000 tokens)
2. **Long Prefix Cold/Warm** (8,000 tokens across all pods)
3. **Concurrent Load** (10 sessions x 5 turns)
4. **Cache Warmup Curve** (20 sequential requests)
5. **Extended Agentic Chain** (12 steps, 10K token context)
6. **Multi-Turn Conversations** (10 turns, 3 conversations)
7. **Agentic Tool-Calling Chain** (8 steps)
8. **Shared Document Multi-User** (20 users, same prefix)

## Repository Structure

```
index.html              Interactive web app (GitHub Pages)
css/styles.css          Web app styling
js/app.js               Chart rendering and interactivity
data/benchmark.json     Complete benchmark dataset
blog/                   Red Hat Developer blog submission
results/                Raw benchmark data
```

## Related

- [llm-d on GitHub](https://github.com/llm-d/llm-d) - The open source project
- [Deploy llm-d in 5 Minutes](https://developers.redhat.com/blog) - Companion deployment guide
- [What is llm-d?](https://redhat.com/en/blog/what-llm-d-and-why-do-we-need-it) - Conceptual foundation

## Author

**Markell Rawls** - Developer Advocate, Red Hat
