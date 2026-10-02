import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { renderRouter } from "expo-router/testing-library";
import RootLayout from "../app/_layout";
import TabLayout from "../app/(tabs)/_layout";
import Explorer from "../app/(tabs)/index";
import Exam from "../app/(tabs)/exam";
import Settings from "../app/(tabs)/settings";
import ClassScreen from "../app/explorer/[id]";
import { classes } from "../lib/species";

const routes = {
  _layout: RootLayout,
  "(tabs)/_layout": TabLayout,
  "(tabs)/index": Explorer,
  "(tabs)/exam": Exam,
  "(tabs)/settings": Settings,
  "explorer/[id]": ClassScreen,
};

// Last settings payload written to storage.
const saved = () => {
  const calls = (AsyncStorage.setItem as jest.Mock).mock.calls;
  return JSON.parse(calls[calls.length - 1]?.[1] ?? "{}");
};

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.clearAllMocks();
});

it("lists every class in the explorer", async () => {
  await renderRouter(routes, { initialUrl: "/" });
  expect(await screen.findByText(classes[0].name)).toBeTruthy();
  expect(screen.getByText("Bienvenido al visu")).toBeTruthy();
});

it("opens a class, filters species and survives an empty result", async () => {
  const c = classes.find((x) => x.name === "Aves")!;
  await renderRouter(routes, { initialUrl: `/explorer/${c.id}` });
  expect(await screen.findByText("Aves")).toBeTruthy();
  const first = c.species[0];
  expect(screen.getByText(first.scientific_name)).toBeTruthy();

  await fireEvent.changeText(screen.getByLabelText("Buscar especie"), "zzzz-no-existe");
  expect(await screen.findByText(/No hay especies que coincidan/)).toBeTruthy();

  await fireEvent.changeText(screen.getByLabelText("Buscar especie"), first.scientific_name.toUpperCase());
  expect(await screen.findByText(first.scientific_name)).toBeTruthy();
});

it("shows a friendly message for an unknown class id", async () => {
  await renderRouter(routes, { initialUrl: "/explorer/999" });
  expect(await screen.findByText("Esta categoría no existe.")).toBeTruthy();
});

it("persists settings and restores them on next launch", async () => {
  const { unmount } = await renderRouter(routes, { initialUrl: "/settings" });
  const toggle = await screen.findByLabelText("Mostrar nombre común");
  expect(toggle.props.value).toBe(true);
  await fireEvent(toggle, "valueChange", false);
  await waitFor(() => expect(saved()).toMatchObject({ showCommonName: false }));
  await unmount();

  await renderRouter(routes, { initialUrl: "/settings" });
  await waitFor(() => expect(screen.getByLabelText("Mostrar nombre común").props.value).toBe(false));
});

it("never lets the exam filters end up empty", async () => {
  await renderRouter(routes, { initialUrl: "/exam" });
  await fireEvent.press(await screen.findByLabelText("Elegir categorías"));
  await fireEvent.press(screen.getByText("Ninguno"));
  await waitFor(() => expect(saved().examClasses).toEqual([classes[0].id]));
  // Deselecting the last remaining class is ignored.
  await fireEvent.press(screen.getByText(classes[0].name));
  expect(screen.getByText(`${classes[0].species.length} especies en el examen`)).toBeTruthy();
});
