# Life in Weeks: class starter

This repo is for one class session: Jai Djwa's AI in Interaction Design class at Capilano University, October 15, 2026.

It's not open to outside contributions. I'll archive it after class.

---

## What's here

A small working web app. Enter your birth date and it fills in a 90-year grid, one square for every week you've lived.

1. `index.html`, `styles.css`, `app.js` are the app. Plain HTML, CSS and JavaScript. Nothing to install.
2. `requirements/` has the product requirements doc (PRD), style guide and tech stack. These are the documents an AI agent builds from.
3. `AGENTS.md` has notes for whichever AI coding agent you use.

There's also a `nextjs` branch with the same app built in Next.js. Ignore it unless we decide to go there in class.

## Get it running

Easiest: click the green **Code** button above, then **Download ZIP**. Unzip it and open `index.html` in your browser. That's it.

If you have git and a GitHub account and think you'll want to share your work at the end, fork it first (**Fork** button, top right), then clone your fork:

```
git clone https://github.com/YOUR-USERNAME/life-in-weeks-capu-oct2026.git
```

## The exercise

Pick a feature to add. Your own idea is best. If you're stuck, here are a few:

1. Mark life events on the grid, like graduating, moving or a first job
2. A different visual style or colour theme
3. Dark mode
4. Compare two people's lives side by side
5. Count down to your next birthday
6. A better phone layout

Then pick a path.

### Path A: start from the PRD

Edit `requirements/prd.md` so it describes your version of the app. Hand it to whatever AI tool you have (Figma Make, Noema, ChatGPT, Claude) and ask it to build it. Compare what you get with the starter.

### Path B: start from the code

Make a branch for your group, then ask your coding agent to add the feature:

```
git checkout -b your-group-name
```

Reload `index.html` to see each change. Keep going until it feels right.

No git? Work on your downloaded copy. Same idea, just no branch.

## Share it (optional)

If you get something working and want to show the class, open a pull request back to this repo:

1. Commit your work on your branch
2. Push the branch to your fork
3. On GitHub, open a pull request into `jeromevaldez/life-in-weeks-capu-oct2026`

Your coding agent can do all three for you. Just ask it.

I'll walk through the pull requests on the projector at the end. Showing it on your own laptop works too.

---

Inspired by Tim Urban's [Life in Weeks](https://waitbutwhy.com/2014/05/life-weeks.html) on Wait But Why. See the finished version at [jeromevaldez.com/lifeinweeks](https://jeromevaldez.com/lifeinweeks/).
