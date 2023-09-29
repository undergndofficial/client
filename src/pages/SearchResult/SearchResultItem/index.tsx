import React from 'react';
import {
  Container,
  PosterDiv,
  MovieInfoDiv,
  DescriptionDiv,
  TitleDiv,
  AdditionalInfoDiv,
  WhiteFontDiv,
} from './style';
import { useNavigate } from 'react-router-dom';

/**
 * 검색 결과로 보여질 영화 아이템
 */
function SearchResultItem() {
  const navigate = useNavigate();
  // 임시
  const id = 1;

  return (
    <Container
      onClick={() => {
        navigate(`/player/${id}`);
      }}
    >
      <PosterDiv url="//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/qgRsG1ij_izEsjPW8fEiUpUnAaA.jpg" />
      <MovieInfoDiv>
        <TitleDiv>들개</TitleDiv>
        <DescriptionDiv>
          입사면접에 번번히 떨어져 취업문턱에서 좌절하는 20대 취준생 정구.
          특별한 존재감없이 살아가는 그의 유일한 낙은 사제폭탄을 만드는 것이다.
          정구는 사람들이 폭탄을 터뜨려주길 바라며 불특정 다수에게 자신이 만든
          폭탄을 보내지만, 모두 대수롭지 않게 여길 뿐이다. 그러던 어느 날 정구
          앞에 폭탄을 터트려 줄 집행자 효민이 나타난다
        </DescriptionDiv>
        <AdditionalInfoDiv>
          <WhiteFontDiv>2014.04.25</WhiteFontDiv>
          <div>
            조회수 <WhiteFontDiv>802</WhiteFontDiv> 회
          </div>
          <div>
            좋아요 <WhiteFontDiv>56</WhiteFontDiv> 개
          </div>
        </AdditionalInfoDiv>
      </MovieInfoDiv>
    </Container>
  );
}

export default SearchResultItem;
