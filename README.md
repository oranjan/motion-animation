live links

01 3d hover button : https://3d-hover-button-eta.vercel.app
02 motion playground : https://motion-playground-wheat.vercel.app
03 motion variants : https://motion-variants-xi.vercel.app
04 motion hooks : https://uttarakhand-peaks.vercel.app
05 layouts : https://most-streamed.vercel.app
06 animation sequences : https://riddle-diary-three.vercel.app

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



05 layouts (most streamed songs list , click a song to open its card)

layoutId : name tag on a motion element
when one element with a layoutId is removed and another with the same layoutId shows up , motion treats them as one element and animates it from old place to new place
in reality react removes the old one and adds a new one , motion just animates between them
ie sliding pill in the nav menu → only the selected button renders the pill , all buttons use the same layoutId="region-pill" , so the pill slides to the clicked button
ie song row → popup card , small cover and big cover have the same layoutId so the cover grows into the card
different id = no connection , only one element with that id on screen at a time , and it has to be a motion element (plain div / article ignores layoutId)

layout : when a parent animates its size (layoutId card shrinking back to the row) motion uses scale , that scale squishes the children too
add layout to the children (rank , wrappers) → motion counter scales them so they keep their real shape

AnimatePresence + exit : without it the popup just vanishes on close and only the layoutId parts fly back , looks weird
AnimatePresence keeps the popup alive till the exit animation is done
open : initial → animate , close : animate → exit
give the child a key so it knows which one is leaving

tween vs spring
spring : physical , can bounce / overshoot
tween : fixed duration + easing curve , stops exactly on target , no bounce
ie transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }} → fast start , long soft landing (ios feel)
sync the text colour with the same duration + curve (transition-colors duration-350) so the text changes with the pill not before it

masking : mask is a stencil over the element
black (any solid colour) = visible , transparent = hidden , in between = see through
ie mask-[linear-gradient(to_top,transparent,black_80px)] → text fades out at the bottom
opacity fades the whole element , mask fades it spot by spot
put the mask on the scroll container not on the text , else the fade moves with the text and the last lines can never be read
add padding same size as the fade (pb-14 for 56px fade) so the last line can scroll clear of it

useClickOutside (custom hook) : close popup on click outside or esc
listens on document , ref.current.contains(e.target) = click was inside
pointerdown not click , so selecting text inside and releasing outside doesnt close it
keep the latest callback in a ref → listeners added only once but always call the newest function , no add/remove listener on every render , no stale function



06 animation sequences (tom riddle's diary , harry's line then the diary's reply write in word by word)

useAnimate : animate elements with a command instead of animate props on each element
const [scope, animate] = useAnimate() , put ref={scope} on the parent
animate('.word', { filter: "blur(0px)", y: 0 }, { duration: 0.3 }) → finds every .word inside scope only , not the whole page
run it in useEffect so the elements are on the page first
it only hits the elements that exist when it runs , anything added later stays at its start style till u run it again (add that state to the effect deps)

stagger : delay: stagger(0.05) → 1st starts at 0 , 2nd at 0.05 , 3rd at 0.1 ... gives the writing effect
stagger counts every matched element , even ones already done , so re running it on all words adds a lag before the new ones
delay can be a function too (i, total) => stagger(0.05)(i, total) + extra , ie add a pause before a group

split : "My name is Harry Potter.".split(" ") → ["My", "name", "is", "Harry", "Potter."]
then .map each word into its own motion.span so each one can animate on its own
split("") gives letters , but spaces become empty spans that collapse and lines can break mid word , so split words first then letters inside
spans need inline-block else y / transform doesnt move them , mr-[0.25em] for the gap between words
