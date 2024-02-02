class Tostada {
  constructor (classname) {
    this.classname = classname
    document.body.insertAdjacentHTML('beforeend', '<div class="tostada-container"></div>')
    this.container = document.querySelector('.tostada-container')
  }

  // Object containing details for different types of toasts
  #toastDetails = {
    success: {
      icon: 'fa-circle-check'
    },
    error: {
      icon: 'fa-circle-xmark'
    },
    warning: {
      icon: 'fa-triangle-exclamation'
    },
    info: {
      icon: 'fa-circle-info'
    }
  }

  setFont = (font) => {
    this.container.style.setProperty('--font', `${font}`)
  }

  setProgressbar = (units) => {
    this.container.style.setProperty('--pb', `${units}`)
  }

  /**
   * Removes the toast from the DOM and clears the timeout for the toast
   * @param {String} toast - The toast element to be removed
   */
  remove = (toast) => {
    toast.classList.add('hide')
    if (toast.timeoutId) clearTimeout(toast.timeoutId)
    setTimeout(() => toast.remove(), 500)
  }

  /**
   * Create a toast with the specified options
   * @param {Object} options - The options for the toast
   */
  create = ({ id = 'info', title = null, msg = null, time = 5, icon = null, color = null }) => {
    // Getting the icon and text for the toast based on the id passed
    let iconX
    if (this.#toastDetails[id] && !icon) {
      iconX = this.#toastDetails[id].icon
    } else {
      iconX = icon
    }

    /**
     * Creating the toast element and setting the classes for the toast
     */
    const toast = document.createElement('div')
    toast.className = `toast ${id}`

    /**
     * Setting the duration for the toast
     */
    toast.style.setProperty('--t', `${time}s`)

    /**
     * Setting the custom color for the toast if it is passed
     */
    if (color !== null) {
      toast.style.setProperty('--custom', `${color}`)
    }

    /**
     * Setting the title for the toast if it is passed
     */
    title ? title = `<b>${title}</b>` : title = ''

    /**
     * Setting the inner HTML for the toast
     */
    toast.innerHTML = `<i class="tostada-icon fa-solid ${iconX}"></i>
                          ${title}
                          <span class="tostada-msg">${msg}</span>
                      <i class="tostada-close fa-solid fa-xmark" onclick="${this.classname}.remove(this.parentElement)"></i>`

    /**
     * Append the toast to the notification ul
     */
    this.container.appendChild(toast)

    /**
     * Setting a timeout to remove the toast after the specified duration
     */
    toast.timeoutId = setTimeout(() => this.remove(toast), time * 1000)
  }
}

const toast = new Tostada('toast')
toast.setFont('Roboto')
toast.setProgressbar('4px')
