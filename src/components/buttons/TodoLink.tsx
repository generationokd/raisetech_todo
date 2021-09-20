import { memo, ReactNode, VFC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

type Props = {
  link: string;
  children: ReactNode;
  onClick: () => void;
};

export const TodoLink: VFC<Props> = memo((props) => {
  const { link, children, onClick } = props;
  return (
    <Link to={link}>
      <Button colorScheme="yellow" mr={3} onClick={onClick}>
        {children}
      </Button>
    </Link>
  );
});

TodoLink.displayName = 'TodoLink';
