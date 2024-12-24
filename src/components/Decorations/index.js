import { useToast } from "@chakra-ui/react";

const Decorations = () => {
  const toast = useToast();

  const handleStartCrafting = () => {
    toast({
      title: "Coming Soon!",
      description: "This feature is not available yet",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top"
    });
  };

  return (
    <Button
      onClick={handleStartCrafting}
      colorScheme="blue"
      size="lg"
      w="full"
    >
      Start Crafting
    </Button>
  );
}; 