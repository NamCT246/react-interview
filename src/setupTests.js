/**
 *  Add extension to jest-dom
 *  https://stackoverflow.com/a/60351942
 **/
import '@testing-library/jest-dom/extend-expect'

/**
 * As testing library using MutationObserver to manipulate the DOM
 * https:github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
 **/
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver
