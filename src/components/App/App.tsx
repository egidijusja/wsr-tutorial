import React, { useState, useEffect } from 'react';
import {
  Container,
  Page,
  Button,
  Box,
  Row,
  Col,
  Card,
  FormField,
  Input,
  Dropdown,
  Checkbox,
  InputArea,
  Text,
} from 'wix-style-react';

interface IFormData {
  name: string;
  color: string;
  funFact: string;
}
interface IColor {
  id: number;
  value: string;
}

const colorOptions: IColor[] = [
  {
    id: 1,
    value: 'Red',
  },
  {
    id: 2,
    value: 'Blue',
  },
  {
    id: 3,
    value: 'Green',
  },
  {
    id: 4,
    value: 'Yellow',
  },
  {
    id: 5,
    value: 'Pink',
  },
];

const initialColorState: IColor = { value: '', id: 0 };

export const App = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(initialColorState);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [funFact, setFunFact] = useState('');
  const [formEnabled, setFormEnabled] = useState(false);
  const [formData, setFormData] = useState<IFormData | null>(null);

  const clearForm = () => {
    setName('');
    setColor(initialColorState);
    setTermsOfUse(false);
    setFunFact('');
  };

  const handleSubmit = () => {
    setFormData({
      name,
      color: color.value,
      funFact,
    });
  };

  useEffect(() => {
    setFormEnabled(!!name && termsOfUse);
  }, [name, termsOfUse]);

  return (
    <Container>
      <Page height="100vh">
        <Page.Header
          title="WSR Form"
          actionsBar={
            <Box>
              <Box marginLeft="small" marginRight="small">
                <Button priority="secondary" onClick={clearForm}>
                  Clear
                </Button>
              </Box>
              <Box>
                <Button disabled={!formEnabled} onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Box>
          }
        />
        <Page.Content>
          <Container>
            <Row>
              <Col span={8}>
                <Card>
                  <Card.Header
                    title="WSR Form"
                    subtitle="Create your own page with wix-style-react"
                  />
                  <Card.Divider />
                  <Card.Content>
                    <Row>
                      <Col span={6}>
                        <FormField label="Name" required>
                          <Input
                            placeholder="Enter a name"
                            dataHook="name-input"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}>
                        <FormField label="Favorite color">
                          <Dropdown
                            dataHook="color-dropdown"
                            placeholder="Enter a color"
                            options={colorOptions}
                            onSelect={(value) => {
                              setColor(value as IColor);
                            }}
                            selectedId={color.id}
                          />
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Checkbox
                          onChange={() => setTermsOfUse(!termsOfUse)}
                          checked={termsOfUse}
                          dataHook="terms-of-use-checkbox"
                        >
                          I agree for the terms of use
                        </Checkbox>
                      </Col>
                      <Col span={4}>
                        <Box flexWrap="wrap">
                          <Box marginLeft="small" marginRight="small">
                            <Button
                              priority="secondary"
                              onClick={clearForm}
                              dataHook="clear-button"
                            >
                              Clear
                            </Button>
                          </Box>
                          <Box>
                            <Button
                              disabled={!formEnabled}
                              onClick={handleSubmit}
                              dataHook="submit-button"
                            >
                              Submit
                            </Button>
                          </Box>
                        </Box>
                      </Col>
                    </Row>
                  </Card.Content>
                </Card>
              </Col>
              <Col span={4}>
                <Row>
                  <Col>
                    <Card>
                      <Card.Header title="Extra" />
                      <Card.Divider />
                      <Card.Content>
                        <FormField label="Fun Fact">
                          <InputArea
                            rows={4}
                            placeholder="Enter something interesting"
                            onChange={(event) => setFunFact(event.target.value)}
                            value={funFact}
                            dataHook="fun-fact-input-area"
                          />
                        </FormField>
                      </Card.Content>
                    </Card>
                  </Col>
                </Row>
                {formData && (
                  <Row>
                    <Col>
                      <Card>
                        <Card.Header title="Submitted info" />
                        <Card.Divider />
                        <Card.Content>
                          <Row>
                            <Col span="6">
                              <Text weight="normal">Name:</Text>
                            </Col>
                            <Col span="6">
                              <Text dataHook="name-text" weight="normal">
                                {formData.name}
                              </Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col span="6">
                              <Text weight="normal">Favorite Color:</Text>
                            </Col>
                            <Col span="6">
                              <Text dataHook="color-text" weight="normal">
                                {formData.color}
                              </Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col span="6">
                              <Text weight="normal">Fun Fact:</Text>
                            </Col>
                            <Col span="6">
                              <Text dataHook="fun-fact-text" weight="normal">
                                {formData.funFact}
                              </Text>
                            </Col>
                          </Row>
                        </Card.Content>
                      </Card>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </Page.Content>
      </Page>
    </Container>
  );
};

export default App;
