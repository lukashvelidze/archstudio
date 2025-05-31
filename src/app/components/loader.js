'use client';
import { useEffect, useState } from 'react';
import './loader.css';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500); // wait for fade to finish
    }, 1200); // total visible duration

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`loaderOverlay ${fadeOut ? 'fadeOut' : ''}`}>
      <div className="spinner" />
    </div>
  );
}
