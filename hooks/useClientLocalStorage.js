// Custom hook to use local storage only on the client-side
const useClientLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            setValue(storedValue);
        }
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
};