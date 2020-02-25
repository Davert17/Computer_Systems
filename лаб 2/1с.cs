using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1c
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введіть перший множник");
            int multiplicand = int.Parse(Console.ReadLine());
            Console.WriteLine("Введіть другий множник");
            int multiplier = int.Parse(Console.ReadLine());
            Evaluate(multiplicand, multiplier);
            Console.ReadKey();
        }

        public static void Evaluate(int multiplicand, int multiplier)
        {
            Int64 P = 0;
            multiplicand <<= 16;
            string A_bits = ToBinary(multiplicand), B_bits = ToBinary(multiplier);
            Console.WriteLine("\tПерший множник: {0}", A_bits);
            Console.WriteLine("\tДругий множник: {0}", B_bits);

            Console.WriteLine("Помножити (множник у правому регістрі) :");
            for (int i = 1; i < 17; ++i)
            {
                Console.WriteLine("  Крок " + i + ":");
                if ((multiplier & 1) == 1)
                {
                    Console.WriteLine("  \tСумма Множеника 1:\t{0}\n\tТа Результату:\t\t{1}", A_bits, ToBinary(P));
                    P += multiplicand;
                    
                }
                P >>= 1;
                Console.WriteLine("  \tРезультат з >:\t\t{0}", ToBinary(P));

                Console.WriteLine("  \tЗсув множника 2 вправо на 1 біт:\t" + ToBinary(multiplier));
                multiplier >>= 1;
                Console.WriteLine("  \t\t\t " + ToBinary(multiplier));
            }

            Console.WriteLine("  Відповідь:\n\tВ десятковій: {0}\n\tВідповідь у двійковій: {1}", P, ToBinary(P));






        }

        public static string ToBinary(Int64 num)
        {
            string binary = string.Empty;
            for (int i = 1; i < 33; ++i)
            {
                binary = (i % 4 == 0 ? " " : "") + (num & 1) + binary;
                num >>= 1;
            }
            return binary;
        }

    }
}
