'use babel';

import { CompositeDisposable } from 'atom';

export default {
    subscriptions: null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.workspace.onDidChangeActiveTextEditor(editor => {
            const view = atom.views.getView(editor);
            if (view) {
                view.classList.forEach(i => {
                    if (i.endsWith('-mode')) {
                        const mode = i.replace('-mode', '');
                        this.fn(mode);
                    }
                });
            }
        }))
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    fn(mode) {
        // console.log(mode);
        const editor = atom.workspace.getActiveTextEditor();
        const view = atom.views.getView(editor);
        const input = view.querySelector(".hidden-input");
        //console.log(view)
        //console.log(input);

        if (mode === 'insert') {
            //input.type = "text";
            input.readOnly = false;
        } else if (['normal', 'visual'].includes(mode)) {
            //input.type = "password";
            input.readOnly = "readonly";
        }
    },

    consumeVim({ observeVimStates }) {
        observeVimStates(vimState => {
            if (vimState.onDidActivateMode) {
                vimState.onDidActivateMode(({ mode }) => this.fn(mode))
            } else {
                vimState.modeManager.onDidActivateMode(({ mode }) => this.fn(mode))
            }
        })
    },
};
