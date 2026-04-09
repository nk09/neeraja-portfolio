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
