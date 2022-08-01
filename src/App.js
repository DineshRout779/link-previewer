import { useState } from 'react';
import { getLinkPreview } from 'link-preview-js';

function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setIsLoading(true);
    setError('');

    if (query) {
      try {
        const res = await getLinkPreview(query);
        setResult(res);
        setIsLoading(false);
        setQuery('');
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setError('Please provide an URL!');
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='container'>
      <h1>Link Previewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='query'
          placeholder='Enter an url for preview'
          className='form-control'
          value={query}
          onChange={handleInputChange}
        />

        <button className='form-control btn-submit' type='submit'>
          Submit
        </button>
      </form>

      <p className='error'>{error ? error : ''}</p>

      <div className='preview'>
        {isLoading ? (
          'Loading...'
        ) : result ? (
          <div className='preview-card'>
            <img src={result.images[0]} alt='Link preview' />
            <div className='content'>
              <p className='title'>{result.title}</p>
              <p className='desc'>
                {result.description.length > 100
                  ? result.description.slice(0, 100) + '...'
                  : result.description}
              </p>

              <a
                href={result.url}
                className='url'
                target='_blank'
                rel='noreferrer'
              >
                Learn more
              </a>
            </div>
          </div>
        ) : (
          'Link preview will appear here...✨'
        )}
      </div>
    </div>
  );
}

export default App;
