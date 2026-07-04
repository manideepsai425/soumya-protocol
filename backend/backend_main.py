"""
Soumya Protocol — FastAPI backend
Deploy on Render (see render.yaml).
"""

from __future__ import annotations

import os
import random
from typing import Annotated

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Soumya Protocol API",
    description="Backend for the Soumya Protocol web experience.",
    version="1.0.0",
)

# Allow the Vercel frontend (and localhost during development).
# Set ALLOWED_ORIGINS in Render's environment variables once you know the
# Vercel deployment URL, e.g.:
#   ALLOWED_ORIGINS=https://soumya-protocol.vercel.app,http://localhost:5173
_raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:4173,http://127.0.0.1:5173",
)
ALLOWED_ORIGINS: list[str] = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Content
# ---------------------------------------------------------------------------

COMPLIMENTS: list[str] = [
    "Soumya, roll no. 56 — you make ordinary days feel like the first sip of proper Darjeeling.",
    "Your smile has the same effect as opening the curtains on a bright spring morning.",
    "If life were an exam, you'd be the bonus question everyone secretly hopes appears.",
    "56 reasons to smile today, and you're at least 55 of them.",
    "Some people light up rooms. You, Soumya, seem to light up entire semesters.",
    "Out of an entire attendance register, 56 is the only number that makes roll call worth showing up for.",
    "If happiness were graded on a curve, you'd be the reason the rest of us need one.",
    "You are, as the poets might say, a solid 56 out of 56.",
]

REFLECTIONS: list[str] = [
    "If God wants her to stay with me, she will stay with me — even without forcing.",
    "I don't wanna force anything. If she's meant for me, she will stay with me without forcing.",
]

HEARTS: list[str] = ["💕", "❤️", "💖", "✨", "🌸", "🫶"]

# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------


class ComplimentsResponse(BaseModel):
    compliments: list[str]
    hearts: list[str]


class ReflectionsResponse(BaseModel):
    reflections: list[str]


class MessageRequest(BaseModel):
    text: str


class MessageResponse(BaseModel):
    formatted: str


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.get("/", include_in_schema=False)
def root() -> dict[str, str]:
    return {"status": "Soumya Protocol v.56 — running 💕"}


@app.get("/health", include_in_schema=False)
def health() -> dict[str, str]:
    # Render pings this path to confirm the service is alive.
    return {"status": "ok"}


@app.get("/api/compliments", response_model=ComplimentsResponse)
def get_compliments(
    count: Annotated[int, Query(ge=1, le=len(COMPLIMENTS))] = 3,
) -> ComplimentsResponse:
    """Return *count* random compliments and a matching set of heart emojis."""
    selected = random.sample(COMPLIMENTS, k=count)
    hearts = random.sample(HEARTS, k=min(count, len(HEARTS)))
    return ComplimentsResponse(compliments=selected, hearts=hearts)


@app.get("/api/reflections", response_model=ReflectionsResponse)
def get_reflections() -> ReflectionsResponse:
    """Return the sincere reflection lines."""
    return ReflectionsResponse(reflections=REFLECTIONS)


@app.post("/api/message", response_model=MessageResponse)
def send_message(body: MessageRequest) -> MessageResponse:
    """Wrap a custom message in the protocol's signature format."""
    text = body.text.strip()
    if not text:
        return MessageResponse(formatted="💕 (nothing to say — and that's okay too)")
    heart = random.choice(HEARTS)
    formatted = f"\u201c{text}\u201d — from the admirer of roll no. 56 {heart}"
    return MessageResponse(formatted=formatted)
