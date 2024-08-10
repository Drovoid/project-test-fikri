import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="relative bg-orange-200 w-full h-full">
      <Navbar />
      <div className="w-screen h-screen grid place-items-center">
        <div className="text-5xl font-bold text-orange-900">
          <h1>Go To Ideas Tab</h1>
        </div>
      </div>
    </main>
  )
}
