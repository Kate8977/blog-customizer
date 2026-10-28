import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontSizeOptions,
  fontFamilyOptions,
  defaultArticleState,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import type { ArticleStateType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);
  const asideRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (asideRef.current && !asideRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      <aside
        ref={asideRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onApply(formState);
          }}
          onReset={(event) => {
            event.preventDefault();
            setFormState(defaultArticleState);
            onApply(defaultArticleState);
          }}
        >
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                fontFamilyOption: option,
              }))
            }
          />

          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                fontSizeOption: option,
              }))
            }
          />

          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                fontColor: option,
              }))
            }
          />

          <Separator />

          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                backgroundColor: option,
              }))
            }
          />

          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                contentWidth: option,
              }))
            }
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
