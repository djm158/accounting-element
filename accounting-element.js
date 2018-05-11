import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { formatMoney, formatNumber, formatColumn, toFixed, unformat } from 'accounting-js'
/**
Element wrapper for the [accounting.js](http://openexchangerates.github.io/accounting.js/) library.


#### Example:

    <accounting-element formatMoney="1234566"></accounting-element> -> $1,234,566.00

    <accounting-element
      format-money="500000"
      symbol="€"
      thousand="."
      decimal=","></accounting-element> -> €500.000,00

    <accounting-element format-number="11987612"></accounting-element> -> 11,987,612

    <accounting-element to-fixed="22987612.1234" precision="2"></accounting-element> -> 22987612.12

    <accounting-element unformat="998,761.2"></accounting-element> -> 998761.2

@element accounting-element
@homepage http://Granze.github.io/accounting-element
@author Maurizio Mangione
@demo
*/
class AccountingElement extends PolymerElement {
  static get template() {
    return html `
    <style>
      :host {
        display: inline-block;
        font-family: 'Roboto Mono', monospace;
      }
    </style>

    <div id="content"></div>
`;
  }

  static get is() {
    return 'accounting-element';
  }

  static get properties() {
    return {
      formatMoney: {
        type: Number,
        observer: '_formatMoney'
      },
      /**
       * @property formatColumn
       * @type Array
       */
      formatColumn: {
        type: Array,
        observer: '_formatColumn'
      },
      /**
       * @property formatNumber
       * @type Number
       */
      formatNumber: {
        type: Number,
        observer: '_formatNumber'
      },
      /**
       * @property toFixed
       * @type Number
       */
      toFixed: {
        type: Number,
        observer: '_toFixed'
      },
      /**
       * @property unformat
       * @type Number
       * @default null
       */
      unformat: {
        type: String,
        value: null,
        observer: '_unformat'
      },
      /**
       * @property symbol
       * @type String
       * @default $
       */
      symbol: {
        type: String,
        value: '$'
      },
      /**
       * @property precision
       * @type Number
       * @default null
       */
      precision: {
        type: Number,
        value: null
      },
      /**
       * @property thousand
       * @type String
       * @default ,
       */
      thousand: {
        type: String,
        value: ','
      },
      /**
       * @property decimal
       * @type String
       * @default .
       */
      decimal: {
        type: String,
        value: '.'
      },
      /**
       * @property format
       * @type String
       * @default %s%v
       */
      formatOpt: {
        type: String,
        value: '%s%v'
      }
    }
  }

  /**
   * @method _formatMoney
   * @param newValue
   * @private
   */
  _formatMoney(newValue) {
    if (newValue !== null) {
      if (this.precision === null) {
        this.precision = 2
      }
      this._render(formatMoney(newValue, this.symbol, this.precision, this.thousand, this.decimal, this.formatOpt));
    }
  }
  /**
   * @method _formatColumn
   * @param newValue
   * @private
   */
  _formatColumn(newValue) {
    if (newValue !== null) {
      if (this.precision === null) {
        this.precision = 2
      }

      var tableData = formatColumn(newValue, this.symbol, this.precision, this.thousand, this.decimal, this.formatOpt);

      var column = tableData.map(function (row) {
        return '<tr><td style="white-space: pre; font-family: monospace;">' + row + '</td></tr>';
      });

      this._render('<table>' + column.join('') + '</table>');
    }
  }
  /**
   * @method _formatNumber
   * @param newValue
   * @private
   */
  _formatNumber(newValue) {
    if (newValue !== null) {
      if (this.precision === null) {
        this.precision = 0
      }
      this._render(formatNumber(newValue, this.precision));
    }
  }
  /**
   * @method _toFixed
   * @param newValue
   * @private
   */
  _toFixed(newValue) {
    if (newValue !== null) {
      this._render(toFixed(newValue, this.precision));
    }
  }
  /**
   * @method _unformat
   * @param newValue
   * @private
   */
  _unformat(newValue) {
    if (newValue !== null) {
      this._render(unformat(newValue));
    }
  }
  /**
   * @method _render
   * @param value
   * @private
   */
  _render(value) {
    this.$.content.innerHTML = value;
  }
}
window
  .customElements
  .define('accounting-element', AccountingElement);
