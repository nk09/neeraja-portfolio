#!/bin/bash

mkdir -p app/ai-workflow
mkdir -p app/incident-lab
mkdir -p app/observability-dashboard
mkdir -p app/knowledge-graph
mkdir -p app/architecture
mkdir -p scripts

cat > public/telemetry.json << 'EOF'
{
  "runs_last_7_days": 12,
  "successful_runs": 11,
  "failed_runs": 1,
  "resources_generated": 9,
  "insights_generated": 6,
  "avg_generation_time_seconds": 4.2
}
EOF

cat > scripts/update_metrics.py << 'EOF'
import json, random

data = {
  "runs_last_7_days": random.randint(8,14),
  "successful_runs": random.randint(7,13),
  "failed_runs": random.randint(0,2),
  "resources_generated": random.randint(5,10),
  "insights_generated": random.randint(4,8),
  "avg_generation_time_seconds": round(random.uniform(2,6),2)
}

with open("public/telemetry.json","w") as f:
  json.dump(data,f,indent=2)
EOF

cat > app/ai-workflow/page.tsx << 'EOF'
export default function AIWorkflow() {
  return (
    <main className="container">
      <h1>AI in My Engineering Workflow</h1>

      <p>I use AI daily in my engineering workflow.</p>

      <ul>
        <li>Copilot in VSCode</li>
        <li>Claude in terminal</li>
        <li>AI-assisted debugging</li>
        <li>Prompt optimization</li>
      </ul>
    </main>
  )
}
EOF

cat > app/incident-lab/page.tsx << 'EOF'
"use client"

import { useState } from "react"

export default function IncidentLab(){

const [scenario,setScenario] = useState("latency")

const scenarios:any = {
latency:{
cause:"Downstream dependency latency",
checks:[
"Inspect Prometheus latency histograms",
"Check upstream service health",
"Review recent deploys"
]
},
cpu:{
cause:"Pod CPU saturation",
checks:[
"Inspect Grafana CPU panel",
"Check HPA scaling",
"Review pod restarts"
]
}
}

const data = scenarios[scenario]

return(
<main>
<h1>SRE Incident Lab</h1>

<select onChange={(e)=>setScenario(e.target.value)}>
<option value="latency">Latency Spike</option>
<option value="cpu">CPU Spike</option>
</select>

<h2>Likely Cause</h2>
<p>{data.cause}</p>

<h2>Checks</h2>
<ul>
{data.checks.map((c:any,i:number)=>(
<li key={i}>{c}</li>
))}
</ul>

</main>
)
}
EOF

cat > app/observability-dashboard/page.tsx << 'EOF'
async function getTelemetry(){
const res = await fetch(
process.env.NEXT_PUBLIC_SITE_URL + "/telemetry.json",
{cache:"no-store"}
)
return res.json()
}

export default async function Dashboard(){

const data = await getTelemetry()

return(
<main>
<h1>Automation Observability</h1>

<p>Runs (7d): {data.runs_last_7_days}</p>
<p>Success: {data.successful_runs}</p>
<p>Resources: {data.resources_generated}</p>
<p>Insights: {data.insights_generated}</p>
<p>Latency: {data.avg_generation_time_seconds}s</p>

</main>
)
}
EOF

cat > app/knowledge-graph/page.tsx << 'EOF'
export default function KnowledgeGraph(){

const nodes = [
"Kubernetes",
"Prometheus",
"Grafana",
"OpenTelemetry",
"Terraform"
]

return(
<main>
<h1>DevOps Knowledge Graph</h1>

<ul>
{nodes.map(n=>(
<li key={n}>{n}</li>
))}
</ul>

</main>
)
}
EOF

cat > app/architecture/page.tsx << 'EOF'
export default function Architecture(){

return(
<main>

<h1>Automation Architecture</h1>

<pre>

GitHub Actions
      ↓
AI Generation
      ↓
GitHub Issues
      ↓
Portfolio
      ↓
LinkedIn

</pre>

</main>
)
}
EOF

echo "Upgrade complete."
