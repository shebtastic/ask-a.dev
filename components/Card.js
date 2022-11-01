import styled, { css } from 'styled-components'

const StyledCard = styled.div`
  display: grid;
  ${({ closed, open }) =>
    !closed && !open
      ? css`
          grid-template-columns: repeat(3, 1fr);
          grid-template-areas:
            'title title title'
            '. child .'
            'submitter . submitterDate';
        `
      : css`
          grid-template-columns: 1fr repeat(3, 2fr);
          grid-template-areas: 'closed title title title' 'closed . . .' 'closed submitter . submitterDate';
        `}
  grid-row-gap: 1em;
  place-items: center;
  padding: 2rem 1.5rem;
  margin: 3rem 1rem;
  min-height: 10rem;
  min-width: 20em;
  max-width: 50em;
  border-radius: 2.2rem;
  box-shadow: 2px 7px 20px -5px rgb(0 0 0 / 35%);
  background-color: var(--background-color-second);
  ${({ closed, open }) =>
    (closed &&
      css`
        &::before {
          content: '✅';
          grid-area: closed;
          font-size: 1.5em;
          padding-right: 1em;
        }
      `) ||
    (open &&
      css`
        &::before {
          content: '💬';
          grid-area: closed;
          font-size: 1.5em;
          padding-right: 1em;
        }
      `)}

  & > h2 {
    width: 100%;
    grid-area: title;
  }

  & > span:first-of-type {
    grid-area: submitter;
    width: 100%;
    height: 100%;
    display: flex;
    place-items: start;
    align-items: flex-end;
    text-align: start;
  }

  & > span:last-of-type {
    grid-area: submitterDate;
    width: 100%;
    height: 100%;
    display: flex;
    place-items: end;
    align-items: flex-end;
    text-align: end;
  }

  & > div {
    grid-area: child;
  }
`

export default StyledCard
