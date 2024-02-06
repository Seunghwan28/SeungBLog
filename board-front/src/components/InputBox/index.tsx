import { ChangeEvent, KeyboardEvent, forwardRef } from 'react'
import './style.css'

//            interface: input box 컴포넌트 Properties                 //
interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;

    icon?: 'eye-light-off-icon' |'eye-light-on-icon' |'expand-right-light-icon';  //필수 아니면 ?표시
    onButtonClick?: () => void;

    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

    //             component: Input Box 컴포넌트                //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
//ref의 기능은 예를 들어서 로그인할 때, 이메일 치고 엔터치면 바로 비번 치는 칸으로 넘어가기, 엔터치면 로그인되기
// 등등의 엔터 치면 바로 넘어가는 기능을 위해서 ref를 사용함

    //             state: properties              //
    const {label, type, placeholder, value, error, icon, message} = props;
    const {onChange, onButtonClick, onKeyDown} = props;


    //            event Handler: input key 변경 이벤트 처리 함수          //
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    }
    //            render: Input Box 컴포넌트                  //
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} />
                {onButtonClick !== undefined &&(
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && <div className={`icon ${icon}`}></div>}
                </div>
                )}
                
            </div>
            {message !== undefined && <div className='inputbox-message'>{message}</div>}
            
        </div>
    )
});

export default InputBox;
