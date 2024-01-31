import {
  StyleBox,
  InfoBox,
  WarningBox,
  ErrorBox,
  CodeBox
} from '@/components/MdxHelpers/Boxes'

function example() {
  return (
    <div className='flex flex-col gap-16 w-1/2 mx-auto mt-12'>
      <StyleBox>This is a Stylish Box 🕺💃</StyleBox>

      <InfoBox text='This is a Information Box 💁' />

      <WarningBox text='This is a WarningBox 🙅' />

      <ErrorBox text='This is an Error Box 😵' />

      <CodeBox code='print("This is code box")' />
    </div>
  )
}

export default example
