"use client";

import Image from "next/image";
import { Camera, Heart, MessageCircle } from "lucide-react";

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  alt: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "https://images.pexels.com/photos/38438338/pexels-photo-38438338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    likes: 342,
    comments: 28,
    alt: "Beautiful pink roses arrangement",
  },
  {
    id: "2",
    imageUrl: "https://images.pexels.com/photos/38584361/pexels-photo-38584361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    likes: 256,
    comments: 19,
    alt: "White hydrangea blooms",
  },
  {
    id: "3",
    imageUrl: "https://images.pexels.com/photos/38566138/pexels-photo-38566138.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    likes: 189,
    comments: 15,
    alt: "Pink and white ranunculus",
  },
  {
    id: "4",
    imageUrl: "https://images.pexels.com/photos/38496196/pexels-photo-38496196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    likes: 423,
    comments: 31,
    alt: "Vibrant pink cosmos flower",
  },
  {
    id: "5",
    imageUrl: "https://images.pexels.com/photos/14415002/pexels-photo-14415002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    likes: 567,
    comments: 42,
    alt: "Peony arrangement in vase",
  },
  {
    id: "6",
    imageUrl: "https://images.pexels.com/photos/38462083/pexels-photo-38462083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    likes: 298,
    comments: 24,
    alt: "Orange lily in bloom",
  },
];

export default function InstagramGallery() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-4 py-1.5 text-sm font-medium text-white">
            <Camera size={16} />
            @petalandbloom
          </div>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-charcoal md:text-4xl">
            Follow Our Floral Journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-warm-gray">
            Get inspired by our latest creations, behind-the-scenes moments, and happy customer shares.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-cream"
            >
              <Image
                src={post.imageUrl}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white">
                  <span className="flex items-center gap-1">
                    <Heart size={18} className="fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={18} className="fill-white" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-white"
          >
            <Camera size={18} />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
