# ParkSmart

ParkSmart is a parking app for NJIT. It shows how many open spots each campus parking lot has, so you can pick a lot before you get there.

Live demo: https://parksmart-five.vercel.app

**Note:** The parking numbers right now are demo data, not real numbers from NJIT. This is not an official NJIT app.

## What you can do

- See open spots for every lot on campus
- Pick the building you're going to (like GITC or CKB) and see which lot is the shortest walk away
- Use your location to find the closest lot when you're on campus
- See all the lots on a map
- Tap a lot to see how busy it usually gets during the day and which buildings are nearby

## Run it yourself

You need [Node.js](https://nodejs.org) installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Built with

Next.js, Tailwind CSS, Leaflet (map) and Recharts (charts).
