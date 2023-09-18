import ForgeUI, {
  render,
  useState,
  useProductContext,
  Text,
  TextField,
  InlineDialog,
  ContentBylineItem,
  Form, 
  Select, 
  Option, 
  Button, 
} from "@forge/ui";
import { properties } from "@forge/api";

const App = () => {
  const { contentId } = useProductContext();

  const [getLabels, setLabels] = useState(async () => {
    let storage = await properties.onConfluencePage(contentId).get("classificationLabels");
    if (typeof storage === "undefined" || storage === null) return [];

    storage = JSON.parse(storage);
    return storage;
  });

  const [getClassState, setClassState] = useState(async () => {
    let result = await properties.onConfluencePage(contentId).get("pageclassification");
    if (typeof result == "undefined" || result === null) result = "not set";

    return result;
  });

  const saveLabel = async (formData) => {
    if (formData) {
      let currentLabels = await getLabels;
      currentLabels.push(
        { label: formData.label, value: formData.label }
      );

      await properties
      .onConfluencePage(contentId)
      .set("classificationLabels", JSON.stringify(currentLabels))
      .then(() => setLabels(currentLabels));
    }
  };

  const saveClassification = async (formData) => {
    await properties
      .onConfluencePage(contentId)
      .set("pageclassification", formData.selection)
      .then(() => setClassState(formData.selection));
  };

  const emptyLabels = async () => {
    await properties
      .onConfluencePage(contentId)
      .set("classificationLabels", "")
      .then(() => setLabels([]));
  }

  const emptyButton = [
    <Button text="Clear saved labels" onClick={emptyLabels} />
  ];

  return (
    <InlineDialog>
      <Text>{`Classification: ${getClassState}`}</Text>
      <Form onSubmit={saveClassification} submitButtonText="Save">
        <Select label="Pick a saved label" name="selection">
          {getLabels.map(option => <Option {...option} />)}
        </Select>
      </Form>

      <Form onSubmit={saveLabel} submitButtonText="Add" actionButtons={emptyButton}>
        <TextField name="label" label="Custom label" />
      </Form>
    </InlineDialog>
  );

};

export const run = render(
  <ContentBylineItem>
    <App />
  </ContentBylineItem>
);

export const getDP = async (contextPayload) => {
  const useValidIcon = true;

  const {
    extension: {
      content: { id: contentId },
    },
  } = contextPayload;

  let getClassState = await properties.onConfluencePage(contentId).get("pageclassification");
  if (typeof getClassState == "undefined") getClassState = "Not set";

  return {
    title: `Classification: ${getClassState}`,
    icon: "https://chapter8.com/assets/images/2023-logo-8.svg",
    tooltip: `Click to change the document classification`,
  };
};