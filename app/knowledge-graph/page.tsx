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
