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
