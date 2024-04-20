import { DeleteIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, StackProps } from '@chakra-ui/react';

type ToolboxProps = {
    onDelete: () => Promise<void>;
    onBlock: () => Promise<void>;
    onUnblock: () => Promise<void>;
    blockDisabled: boolean;
    unblockDisabled: boolean;
    deleteDisabled: boolean;
    deleteLoading: boolean;
    blockLoading: boolean;
    unblockLoading: boolean;
} & StackProps;

export function Toolbox({
    onBlock,
    onUnblock,
    onDelete,
    deleteLoading,
    blockDisabled,
    unblockDisabled,
    deleteDisabled,
    blockLoading,
    unblockLoading,
    ...stackProps
}: ToolboxProps) {
    return (
        <HStack {...stackProps} gap="1rem">
            <Button
                leftIcon={<LockIcon />}
                isDisabled={blockDisabled}
                isLoading={blockLoading}
                onClick={onBlock}
            >
                Block
            </Button>
            <IconButton
                colorScheme="blue"
                aria-label="Search database"
                icon={<UnlockIcon />}
                isDisabled={unblockDisabled}
                isLoading={unblockLoading}
                onClick={onUnblock}
            />
            <IconButton
                colorScheme="red"
                aria-label="Search database"
                icon={<DeleteIcon />}
                isDisabled={deleteDisabled}
                isLoading={deleteLoading}
                onClick={onDelete}
            />
        </HStack>
    );
}
