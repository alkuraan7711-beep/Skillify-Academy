# Skillify Academy

A responsive landing page for an online tech academy. It features a hero section, course categories, a filterable course list that links to the real learning platforms, a "how it works" section, pricing plans, reviews and a footer. Built with plain HTML, CSS and JavaScript (no framework, no build step).

**[Live demo](https://skillify-academy-psi.vercel.app/)**

![Skillify Academy](./Screenshot%202026-11-09%20221231.gif)

> Portfolio project. The six courses are real and link to the original providers. The stats, reviews and pricing plans are sample content, and the footer says so.

## Features

- **Fully responsive**: media queries at 1100px, 900px, 600px and 380px. The menu becomes a hamburger on tablets and phones, grids collapse step by step, and nothing scrolls sideways (checked from 320px to 1440px).
- **Real courses**: each card opens the original course page in a new tab (The Odin Project, Google UX Design on Coursera, Kaggle Learn, HubSpot Academy, javascript.info, Udemy). Cards show whether the course is free or paid instead of made-up ratings and prices.
- **Course filter**: filter by category with the chips, the category cards, the "Courses" dropdown or the footer links. The result count is announced to screen readers.
- **Hero learning card**: a small "continue learning" card with an animated progress bar that shows the product at a glance.
- **Login / Sign up dialog** (demo): built on the native `<dialog>` element, with browser validation and a different title per pricing plan. Nothing is sent or stored.
- **Accessibility**: skip link, semantic landmarks, visible keyboard focus, `aria-expanded` / `aria-pressed` states, the whole course card is one link, and `prefers-reduced-motion` is respected.
- Sticky header, smooth scrolling and a keyboard-friendly dropdown.

## Built with

- HTML5, CSS (custom properties, Grid, Flexbox, media queries), vanilla JavaScript
- Fonts: Poppins and Inter from Google Fonts

## Run it locally

No install needed. Open `index.html` in your browser, or serve the folder:

```bash
npx serve .
```

## Project structure

```
index.html   page structure and content
style.css    styles and media queries
script.js    mobile menu, course filter, login / sign-up dialog
```

## Updating the courses

Each course is one `<article class="cours" data-category="...">` in `index.html`. To add a course, copy a card, change the category, title, link and tags. The category must match one of the filter names (Web Development, Design, Data Science, Marketing) so the filter can find it. Remember to update the course counts on the category cards.

## What I learned

- How to turn a desktop-only layout into a responsive one with a few focused media queries
- How one event listener with data-attributes can drive a filter from many different buttons
- How the native <dialog> element gives you focus handling and Esc-to-close for free

## Possible improvements

- Arabic (RTL) version of the page
- A real sign-up flow with a backend
- Search box next to the category filter
