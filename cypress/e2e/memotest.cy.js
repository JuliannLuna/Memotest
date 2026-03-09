const URL = "127.0.0.1:8080";

describe("Juego de Memotest", () => {
  // Antes de cada prueba, Cypress "visita" tu página
  beforeEach(() => {
    cy.visit(URL);
  });

  it("Asegura que el juego inicie correctamente", () => {
    // Busca el botón y le hace clic
    cy.get("#boton-jugar").click();

    // Verifica que el botón haya cambiado a "Reiniciar"
    cy.get("#boton-jugar").should("have.text", "Reiniciar");

    // Verifica que haya exactamente 8 cuadros en el tablero
    cy.get(".cuadro").should("have.length", 8);
  });

  it("Revela un cuadro al hacer clic y suma un turno", () => {
    cy.get("#boton-jugar").click();

    // Hace clic en el primer cuadro
    cy.get(".cuadro").first().click();
    // Verifica que ya no tenga la clase gris
    cy.get(".cuadro").first().should("not.have.class", "!bg-gray-400");

    // Hace clic en el último cuadro
    cy.get(".cuadro").last().click();

    // Verifica que el turno haya aumentado a 1
    cy.get("#turno strong").should("have.text", "1");
  });

  it("Resuelve el juego encontrando todos los pares y muestra el mensaje de victoria", () => {
    // 1. Iniciamos el juego
    cy.get("#boton-jugar").click();

    // 2. Definimos los colores que sabemos que existen en tu código
    const colores = [
      "bg-pink-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-lime-500",
    ];

    // 3. Le decimos a Cypress que busque y haga clic en los pares, color por color
    colores.forEach((color) => {
      // Cypress busca los 2 cuadros que tengan esta clase específica y les hace clic
      cy.get(`.cuadro.${color}`).each(($cuadro) => {
        cy.wrap($cuadro).click();

        // Agregamos una pequeña pausa para darle tiempo a la animación/lógica (opcional pero recomendado en Cypress)
        cy.wait(100);
      });
    });

    // 4. Verificamos que el tablero haya desaparecido
    cy.get("#tablero").should("have.class", "hidden");

    // 5. Verificamos que el mensaje de ganador ahora sea visible
    cy.get("#mensaje-ganador").should("not.have.class", "hidden");

    // 6. Verificamos que el puntaje final sea exactamente 4
    cy.get("#puntaje strong").should("have.text", "4");
  });
});
