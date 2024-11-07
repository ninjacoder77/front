import { Component, Input } from '@angular/core';

/**
 * CardComponent
 *
 * Componente que representa um card com imagem e um botão.
 *
 * @example
 * ```html
 * <app-card
 *   buttonLabel="Cadastrar aluno"
 *   routeUrl="/administrador/cadastrar-aluno"
 * />
 * ```
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  /**
   * Valor que será mostrado no botão de redirecionamento.
   */
  @Input() buttonLabel = '';

  /**
   * Descrição da imagem que será utilizada no atributo `alt` do elemento `<img />`.
   *
   * Esta descrição melhora a acessibilidade e é exibida quando a imagem não pode ser carregada.
   */
  @Input() imageDescription =
    "A imagem tem quatro círculos, cada um representando um aspecto diferente da escola: Círculo superior esquerdo: Um caderno com 'ABC', lápis e papel, representando a aprendizagem do alfabeto e escrita básica. Círculo superior direito: Um arco-íris, régua, dado, círculo e triângulo, sugerindo o aprendizado de formas, cores e conceitos matemáticos básicos. Círculo inferior esquerdo: Um quadro-negro com figuras geométricas, letras e símbolos, além de uma bola de basquete e tesoura, indicando aprendizado mais avançado, como geometria. Círculo inferior direito: Mochila, tubo de ensaio, giz de cera e tesoura, representando materiais escolares.";

  /**
   * Caminho ou URL da imagem que será utilizada no atributo `src` do elemento `<img />`.
   *
   * @defaultValue `/assets/card-default-image.png` - imagem padrão dos cards.
   */
  @Input() imageUrl = '/assets/card-default-image.png';

  /**
   * Caminho/Rota para qual o usuário será redirecionado quando clicar no botão.
   */
  @Input() routeUrl = '';
}
