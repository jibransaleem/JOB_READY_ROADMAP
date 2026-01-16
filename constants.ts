
import { RoadmapModule, Project } from './types';

export const ROADMAP_DATA: RoadmapModule[] = [
  {
    id: 'm1-foundations',
    title: 'Module 01: Foundations & NLP Core',
    description: 'The scientific and programmatic base for modern AI. Understanding the "how" before the "what".',
    priority: 1,
    icon: '🧬',
    totalTargetHours: 80,
    skills: [
      { id: 's1', name: 'Python Deep Dive', description: 'Asyncio, Metaclasses, Memory management, and High-performance patterns.', completed: false, timeEstimate: 25 },
      { id: 's2', name: 'Transformer Architecture', description: 'Self-attention, Multi-head attention, Positional encoding from scratch.', completed: false, timeEstimate: 20 },
      { id: 's3', name: 'Hugging Face Ecosystem', description: 'Transformers, Datasets, Tokenizers, Accelerate, and Hub.', completed: false, timeEstimate: 20 },
      { id: 's4', name: 'Data Engineering Fundamentals', description: 'ETL pipelines, Parquet/Avro, Spark basics, and Data cleaning for LLMs.', completed: false, timeEstimate: 15 }
    ]
  },
  {
    id: 'm2-genai-app',
    title: 'Module 02: GenAI Application Layer',
    description: 'Building actual products with Large Language Models. Focus on search and context.',
    priority: 2,
    icon: '🛠️',
    totalTargetHours: 120,
    skills: [
      { id: 's5', name: 'Prompt Engineering', description: 'Chain-of-Thought, ReAct, Few-shot, and Automated Prompt Optimization.', completed: false, timeEstimate: 15 },
      { id: 's6', name: 'Vector Embeddings', description: 'Similarity metrics, Dimension reduction, and specialized embedding models.', completed: false, timeEstimate: 15 },
      { id: 's7', name: 'Vector Databases', description: 'Pinecone, Weaviate, Qdrant, and Postgres/pgvector architecture.', completed: false, timeEstimate: 20 },
      { id: 's8', name: 'RAG Systems', description: 'Advanced retrieval (Hybrid, Semantic), Re-ranking, and Context window management.', completed: false, timeEstimate: 35 },
      { id: 's9', name: 'LangChain / LlamaIndex', description: 'Orchestration frameworks, Memory management, and Callback handlers.', completed: false, timeEstimate: 35 }
    ]
  },
  {
    id: 'm3-advanced-eng',
    title: 'Module 03: Advanced Model Engineering',
    description: 'Moving beyond APIs to training, optimization, and specialized modalities.',
    priority: 3,
    icon: '🧠',
    totalTargetHours: 150,
    skills: [
      { id: 's10', name: 'Agentic Systems', description: 'Multi-agent orchestration, Tool use, and Planning algorithms (LangGraph).', completed: false, timeEstimate: 30 },
      { id: 's11', name: 'LoRA & QLoRA', description: 'Parameter Efficient Fine-Tuning (PEFT) on custom domain datasets.', completed: false, timeEstimate: 30 },
      { id: 's12', name: 'RLHF & Alignment', description: 'Proximal Policy Optimization (PPO), Direct Preference Optimization (DPO).', completed: false, timeEstimate: 30 },
      { id: 's13', name: 'Model Quantization', description: 'GGUF, EXL2, AWQ, and BitsAndBytes for efficient local/server inference.', completed: false, timeEstimate: 20 },
      { id: 's14', name: 'Multimodal AI', description: 'CLIP, LLaVA, Florence-2: vision-language and audio-text cross-modalities.', completed: false, timeEstimate: 25 },
      { id: 's15', name: 'LLM Evaluation', description: 'RAGAS, G-Eval, Human-in-the-loop, and LLM-as-a-Judge protocols.', completed: false, timeEstimate: 15 }
    ]
  },
  {
    id: 'm4-llmops-infra',
    title: 'Module 04: LLMOps & Infrastructure',
    description: 'Industrial-grade deployment. Reliability, scalability, and lifecycle management.',
    priority: 4,
    icon: '🏗️',
    totalTargetHours: 150,
    skills: [
      { id: 's16', name: 'Docker & NVIDIA Toolkit', description: 'GPU-accelerated containers and multi-stage ML builds.', completed: false, timeEstimate: 20 },
      { id: 's17', name: 'Kubernetes Fundamentals', description: 'Pod scheduling, Kserve, and GPU resource management in K8s.', completed: false, timeEstimate: 30 },
      { id: 's18', name: 'CI/CD Pipelines', description: 'Automated testing for ML, model deployment strategies (Canary/Blue-Green).', completed: false, timeEstimate: 20 },
      { id: 's19', name: 'Cloud Platforms (AWS/GCP)', description: 'SageMaker, Vertex AI, and raw H100/A100 cluster management.', completed: false, timeEstimate: 25 },
      { id: 's20', name: 'Infrastructure as Code', description: 'Terraform and Pulumi for reproducible GPU infrastructure.', completed: false, timeEstimate: 20 },
      { id: 's21', name: 'Experiment & Registry', description: 'MLflow and W&B for versioning prompts, models, and data.', completed: false, timeEstimate: 15 },
      { id: 's22', name: 'Prompt Management', description: 'Prompt CMS, versioning, and A/B testing of system messages.', completed: false, timeEstimate: 10 },
      { id: 's23', name: 'Feature Stores', description: 'Feast/Tecton for real-time inference data and low-latency lookups.', completed: false, timeEstimate: 10 }
    ]
  },
  {
    id: 'm5-production-ready',
    title: 'Module 05: Scalable Production',
    description: 'Post-deployment: Monitoring, safety, governance, and business impact.',
    priority: 5,
    icon: '🛰️',
    totalTargetHours: 100,
    skills: [
      { id: 's24', name: 'Deployment & Serving', description: 'vLLM, TGI, and TensorRT-LLM for high-throughput inference.', completed: false, timeEstimate: 20 },
      { id: 's25', name: 'Monitoring & Observability', description: 'LangSmith, Phoenix, and custom Prometheus metrics for LLMs.', completed: false, timeEstimate: 20 },
      { id: 's26', name: 'Cost Optimization', description: 'Token budgeting, caching strategies, and spot instance training.', completed: false, timeEstimate: 15 },
      { id: 's27', name: 'Safety & Alignment', description: 'Guardrails AI, NeMo Guardrails, and red-teaming for jailbreaks.', completed: false, timeEstimate: 15 },
      { id: 's28', name: 'Model Governance', description: 'Compliance (GDPR/EU AI Act), Ethics, and Model Cards.', completed: false, timeEstimate: 15 },
      { id: 's29', name: 'Logging & Auditing', description: 'Traceability and legal compliance for enterprise GenAI apps.', completed: false, timeEstimate: 15 }
    ]
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  { id: 'p1', name: 'Enterprise RAG Platform', description: 'Multi-source RAG with ColBERT reranking and custom evaluation.', status: 'Not Started', category: 'Phase 1' },
  { id: 'p2', name: 'Auto-GPT Researcher', description: 'Agentic workflow for deep-web research using LangGraph.', status: 'Not Started', category: 'Phase 2' },
  { id: 'p3', name: 'Domain LoRA Trainer', description: 'Fine-tuned model for specialized legal or medical reasoning.', status: 'Not Started', category: 'Phase 3' },
  { id: 'p4', name: 'LLMOps Control Plane', description: 'K8s based serving stack with Prometheus and LangSmith.', status: 'Not Started', category: 'Phase 4' }
];
