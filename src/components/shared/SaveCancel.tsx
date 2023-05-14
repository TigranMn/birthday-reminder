import Icon from './Icon'

type SaveCancelProps = {
  handleSave?: (e: any) => void
  handleCancel: (e: any) => void
}

export default function SaveCancel({ handleSave, handleCancel }: SaveCancelProps) {
  return (
    <div className='flex items-center gap-2'>
      <Icon icon='lnr-checkmark-circle' onClick={handleSave} className='text-green-400' />
      <Icon icon='lnr-cross-circle' onClick={handleCancel} className='text-red-400' />
    </div>
  )
}
