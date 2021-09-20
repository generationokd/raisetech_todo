import { memo, VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editTask: string;
  editTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editDate: string;
  editDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editTodoUpdate: () => void;
};

export const TodoModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    editTask,
    editTaskChange,
    editDate,
    editDateChange,
    editTodoUpdate,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>予定</FormLabel>
            <Input value={editTask} onChange={editTaskChange} />
            <FormLabel>期限</FormLabel>
            <Input value={editDate} type="date" onChange={editDateChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            閉じる
          </Button>
          <Button variant="ghost" onClick={editTodoUpdate}>
            更新
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
TodoModal.displayName = 'TodoModal';
