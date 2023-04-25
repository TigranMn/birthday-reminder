import Heading from '@/components/shared/Heading/Heading'

type HeaderProps = {
  heading: string
  btnText: string
  handleClick: () => void
  text: string
}

export default function Header({ heading, btnText, text, handleClick }: HeaderProps) {
  return (
    <div className='mb-10 text-default dark:text-darkDefault'>
      <Heading tag={'h2'} className='mt-6 text-center text-3xl font-extrabold '>
        {heading}
      </Heading>
      <p className='mt-2 text-center text-sm'>
        {text}
        <button
          onClick={handleClick}
          className='font-medium underline text-default hover:text-secondary dark:text-darkDefault hover:dark:text-darkSecondary'>
          {btnText}
        </button>
      </p>
    </div>
  )
}
