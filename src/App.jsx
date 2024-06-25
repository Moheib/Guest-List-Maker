import { useState } from 'react'
import ItemDialog from './participants/inviteDialog'
import ItemList from './participants/itemList'

function App() {

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <ItemDialog open={open} handleClose={handleClose} data={data} setData={setData} />
      <ItemList handleOpen={handleOpen} data={data} setData={setData} />
    </>
  )
}

export default App
