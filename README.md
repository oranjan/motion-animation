live links

01 3d hover button : https://3d-hover-button-eta.vercel.app
02 motion playground : https://motion-playground-wheat.vercel.app
03 motion variants : https://motion-variants-xi.vercel.app
04 motion hooks : https://motion-hooks.vercel.app

what i learned 

ease-in-out: eased motion start end , fast at mid 
ease-in : ease at start , rest all fast
ease-out: ease at the end , rest all fast
conditonal ui have to be used with       <AnimatePresence> component to make it animated else we wontr get the exit animation it is lost 
because react removes element instantly


motion element props
inital : starts from this css 
animate : what will be the final css 
exit : css  when element is removed from ui
transiton : how does the animation should go , duration , trantion timing fucntion , delay etc of the animation when going from one state to another 
ie inital to anbimate on exit etc 

duration 200ms-300ms is comman animation duration used




useScroll : get scrolling related values from this motion hook
scrollYProgress 0-1 (vertical) , scrollXProgress 0-1 (horizontal)
scrollX scrollY : distance scrolled in px
no options = whole page , target = track a specific element , offset = when progress is 0 and when it is 1
ie offset: ["start end", "end start"] → 0 when element top hits screen bottom , 1 when element bottom leaves screen top

these are motion values , they change every frame but dont rerender the component , thats why scroll animations stay smooth

useTransform : map the 0-1 progress to any range
ie useTransform(scrollYProgress, [0, 0.5, 1], [0, 150, -150]) → moves down then up
works for opacity , scale , y , colors too (blends hex colors)
blur / filter needs a css string not a number so wrap it with useMotionTemplate
ie useMotionTemplate`blur(${blur}px)` → px goes inside the brackets

pass these values to style , only works on motion elements (motion.div etc) not normal div
one useScroll can drive many effects , no need of separate hooks for each

useMotionValueEvent : run code when a motion value changes
ie show back to top button when scrollY > window.innerHeight
use it when u need a decision (show/hide) not a style
setState here only rerenders when the value actually changes

style vs animate
style : value follows live input like scroll , drag , cursor (continuous)
animate : element goes to a new state like show/hide , hover , open/close (limited states)
