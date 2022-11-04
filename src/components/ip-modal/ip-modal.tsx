import { Component, h, Element, State, Prop } from '@stencil/core';

@Component({
  tag: 'ip-modal',
  styleUrl: './ip-modal.scss',
  shadow: true,
})
export class IpModal {
  @Element() el: HTMLElement;

  @State() modalContent;
  @State() modalbackdrop;
  @State() htmlElement;
  @Prop() closeButton: string;

  componentDidRender() {
    this.modalContent = this.el.shadowRoot.querySelector('.ip-modal-content');
    this.modalbackdrop = this.el.shadowRoot.querySelector('.ip-modal-backdrop');
    this.htmlElement = document.querySelector('html');
    this.openModal();
  }

  private openModal() {
    const modalBtn = this.el.querySelector('#ip-modal-button button');
    modalBtn.addEventListener('click', () => {
      this.modalContent.classList.add('ip-modal-content-show');
      this.modalbackdrop.classList.add('ip-modal-backdrop-show');
      this.htmlElement.style.overflowY = 'hidden';
    });
  }

  private closeModal() {
    this.modalContent.classList.remove('ip-modal-content-show');
    this.modalbackdrop.classList.remove('ip-modal-backdrop-show');
    this.htmlElement.style.overflowY = 'unset';
  }

  render() {
    return (
      <div class="ip-modal">
        <slot name="ip-modal-button"></slot>

        <div class="ip-modal-content">
          <slot name="ip-modal-content"></slot>

          <button part="close-btn" onClick={this.closeModal.bind(this)}>
            {this.closeButton ? this.closeButton : '+'}
          </button>
        </div>

        <div class="ip-modal-backdrop" onClick={this.closeModal.bind(this)}></div>
      </div>
    );
  }
}
