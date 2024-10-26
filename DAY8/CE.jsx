const App = () => {
  const [message, setMessage] = useState('Hello dear one, learning React...');

  useEffect(() => {
    // This effect will only run once when component mounts
    console.log('useEffect hook called');
    
    const timer = setTimeout(() => {
      setMessage('Great... This is time to learn about HOOKS');
    }, 2000);

    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(timer);
      console.log('Cleanup: Timer cleared');
    };
  }, []); // Empty dependency array means effect runs only once on mount

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">useEffect Demo</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default App;
