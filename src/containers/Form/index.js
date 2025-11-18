import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
    const [resetKey, setResetKey] = useState(0);
    const [sending, setSending] = useState(false);

    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault();
            setSending(true);

            try {
                await mockContactApi();

                evt.target.reset();
                setResetKey(prev => prev + 1);

                setSending(false);
                onSuccess();
            } catch (err) {
                setSending(false);
                onError(err);
            }
        }, [onSuccess, onError]
    );

    return (
        <form onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field name="nom" label="Nom" />
                    <Field name="prénom" label="Prénom" />
                    <Select
                        selection={["Personnel", "Entreprise"]}
                        onChange={() => null}
                        label="Personnel / Entreprise"
                        type="large"
                        titleEmpty
                        resetKey={resetKey}
                    />
                    <Field name="email" label="Email" />
                    <Button
                        type={BUTTON_TYPES.SUBMIT}
                        title="Envoyez vos réponses"
                        disabled={sending}
                    >
                        {sending ? "En cours..." : "Envoyer"}
                    </Button>
                </div>
                <div className="col">
                    <Field
                        placeholder="Entrez votre message..."
                        label="Message"
                        type={FIELD_TYPES.TEXTAREA}
                    />
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
}

Form.defaultProps = {
    onError: () => null,
    onSuccess: () => null,
}

export default Form;