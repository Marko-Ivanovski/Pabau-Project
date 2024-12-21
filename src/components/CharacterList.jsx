import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLanguage } from '../LanguageContext';
import Spinner from './Spinner';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  const [characters, setCharacters] = useState([]);
  const { language, translations } = useLanguage();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (data) {
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...data.characters.results,
      ]);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        data?.characters?.info?.next &&
        !loading && !isLoadingMore // Check if data is not already loading
      ) {
        // Show spinner before loading more
        setIsLoadingMore(true);

        // Simulate loading delay
        await sleep(1000); // 1-second delay

        fetchMore({
          variables: { page: data.characters.info.next },
        }).then(({ data: fetchMoreData }) => {
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...fetchMoreData.characters.results,
          ]);
          setIsLoadingMore(false); // Reset loading state
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, fetchMore, loading, isLoadingMore]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="character-box">
        <h1>{translations[language].title}</h1>
        <div className="character-list">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              <div className="character-header">{character.name}</div>
              <div className="character-details">
                <p>{translations[language].status}: {character.status}</p>
                <p>{translations[language].species}: {character.species}</p>
                <p>{translations[language].gender}: {character.gender}</p>
                <p>{translations[language].origin}: {character.origin.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isLoadingMore && <Spinner />}
    </div>
  );
};

export default CharacterList;