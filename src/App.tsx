import { Button } from "./components/ui/button"
import { Card } from "./components/ui/card"
import { Input } from "./components/ui/input"

const App = () => {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <Input type="text" placeholder="email" />
        <Input placeholder="password" />
        <Button>Send</Button>
        <Input id="check" type="checkbox" />
      </Card>
    </div>
  )
}

export default App

