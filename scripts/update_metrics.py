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
