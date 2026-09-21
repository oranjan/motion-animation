import { motion } from "motion/react"
const App = () => {
  return (
    <div className='min-h-screen perspective-distant transform-3d w-screen  flex justify-center items-center bg-neutral-800 bg-[radial-gradient(var(--color-neutral-600)_0.5px,transparent_0.5px)] bg-size-[8px_8px]'>
      <motion.button
      //    initial={{
      //   rotate:0
      // }}
      // animate={{
      //   rotate:[0,10,0],
      // }}
      // transition={{
      //   duration:0.5,
      //   ease:"easeInOut"
      // }}
        whileHover={{
          rotateX: 10,
          rotateY: 10,
          boxShadow: "0px 20px 50px rgba(8,112,184,0.7)",
          y:-5
        }}
      
        
        whileTap={{y:0}}
        transition={{duration:0.3,
          ease:"easeInOut"
        }}
      className= 'group relative bg-black text-white px-10 py-4 rounded-lg translate-z-25'>
        <span className="group-hover:text-cyan-500 transition-colors duration-300">
        Let's Start

        </span>

        <span className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent w-3/4 mx-auto"></span>
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent w-3/4 mx-auto blur-sm"></span>

      </motion.button>
    </div>
  )
}

export default App
