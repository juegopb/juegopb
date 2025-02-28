import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../BullrichArcadePreview.css'; // Importamos los estilos
import proimg from "../assets/BULLRICH PRO.jpeg";
import montoneraImg from "../assets/BULLRICH MONTONERA.jpeg";
import menemistaImg from "../assets/BULLRICH MENEMISTA.jpeg";
import libertariaaImg from "../assets/BULLRICH LIBERTARIA.jpeg";
import KirchneristaImg from "../assets/BULLRICH KIRCHNERISTA.jpeg";
export default function BullrichArcadePreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [selected, setSelected] = useState(null);

  const characters = [
    { key: 'montonera', title: 'Bullrich Montonera', description: 'Ex guerrillera en los 70, militante de Montoneros.', image:montoneraImg },
    { key: 'menemista', title: 'Bullrich Menemista', description: 'Ministra de Trabajo en la era Menem.', image: menemistaImg},
    { key: 'kirchnerista', title: 'Bullrich Kirchnerista', description: 'Aliada de Néstor Kirchner.', image: KirchneristaImg},
    { key: 'pro', title: 'Bullrich PRO', description: 'Ministra de Seguridad bajo Macri.', image: proimg },
    { key: 'libertaria', title: 'Bullrich Libertaria', description: 'Apoyando a Milei.', image: libertariaaImg},
  ];

  useEffect(() => {
    let intervalId;
    if (rolling) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % characters.length);
      }, 100);
    } else {
      if (selected) {
        setCurrentIndex(characters.findIndex((ch) => ch.key === selected.key));
      }
    }
    return () => intervalId && clearInterval(intervalId);
  }, [rolling, selected]);

  const handleClick = () => {
    setSelected(null);
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      setSelected(characters[Math.floor(Math.random() * characters.length)]);
    }, 2000);
  };

  return (
    <>
      <div className="arcade-background"></div>

      <div className="relative z-10 flex flex-col items-center pt-8">
        {/* 🎰 Título */}
        <div className="arcade-tit">
          <h1>¡Tirá de la palanca y descubrí cuál es tu Bullrich de hoy!</h1>
          <small className="arcade-subtitle">(Hoy podés ser Montonera, mañana PRO... ¿Qué te tocará?)</small>
        </div>

        {/* 🎮 Palanca */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClick} className="arcade-handle">
          <div className="handle-stick">
            <div className="handle-ball"></div>
          </div>
          <p className="arcade-subtitle">(Insert coin & pull!)</p>
        </motion.div>

        {/* 📺 Marco de la máquina */}
        <div className="arcade-frame">
          <img src={characters[currentIndex].image} alt="current bullrich" />
        </div>

        {/* 📜 Descripción - Ubicada justo debajo de la imagen */}
        {selected && !rolling && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            className="character-description"
          >
            <h2 className="text-white text-md uppercase mb-2">{selected.title}</h2>
            <p className="text-white text-sm">{selected.description}</p>
            <p className="text-white text-xs mt-2">¿Te animás a volver a tirar?</p>
          </motion.div>
        )}
      </div>
    </>
  );
}
